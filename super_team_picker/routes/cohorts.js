const express = require("express");

const knex = require("../db/client");

const router = express.Router();

router.get("/", (req, res) => {
  knex("cohorts")
    .select("*")
    .then(data => {
      res.render("cohorts/index", {
        cohorts: data
      })
    })
})

router.get("/new", (req, res) => {
  res.render('cohorts/new');
})

// router.get("/cohorts/:id", (req, res) => {
//   res.send(req.params);
// })

router.get("/:id", (req, res) => {
  knex("cohorts")
    .select("*")
    .where({ id: req.params.id })
    .then(data => {
      res.render("cohorts/show", {
        cohort: data[0]
      })
    })
})

router.post("/new", (req, res) => {
  const cohortsParams = {
    logoUrl: req.body.logoUrl,
    name: req.body.name,
    members: req.body.members
  }

  // save a cohort to database
  knex("cohorts")
    .insert(cohortsParams)
    .returning("*")
    .then(data => {
      res.redirect(`/cohorts/${data[0].id}`);
    })
})

router.delete("/:id", (req, res) => {
  knex("cohorts")
    .where({id: req.params.id})
    .delete()
    .then(data => {
      res.redirect("/cohorts")
    })
})

router.get("/:id/edit", (req, res) => {
  knex("cohorts")
    .select("*")
    .where({id: req.params.id})
    .then(data => {
      res.render("cohorts/edit", {
        cohort: data[0]
      })
    })
})

router.patch("/:id", (req, res) => {
  const cohortParams = {
    logoUrl: req.body.logoUrl,
    name: req.body.name,
    members: req.body.members
  }

  knex("cohorts")
    .where({id: req.params.id})
    .update(cohortParams)
    .returning("id")
    .then(data => {
      res.redirect(`/cohorts/${data[0]}`)
    })
})
module.exports = router;