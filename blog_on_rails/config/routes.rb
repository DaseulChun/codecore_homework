Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  root to: 'posts#index'
  resources :posts do
    resources :comments, only: [:create, :destroy]
  end

  # GET	/posts	posts#index	posts_path
  # GET	/posts/new	posts#new	new_post_path
  # POST	/posts	posts#create	posts_path
  # GET	/posts/:id	posts#show	post_path(:id)
  # GET	/posts/:id/edit	posts#edit	edit_post_path(:id)
  # PATCH/PUT	/posts/:id	posts#update	post_path(:id)
  # DELETE	/posts/:id	posts#destroy	post_path(:id)

  # POST /posts/:id/comments comments#create post_comments
  # DELETE /comments/:id comments#destroy post_comment
end
