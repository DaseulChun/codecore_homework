class UsersController < ApplicationController

  before_action :authenticated_user!, only: [:edit]
  before_action :authorize!, only: [:edit, :update]

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    
    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "User has been saved!"
      redirect_to root_path
    else
      flash[:danger] = "User not saved. Try again!"
      render :new
    end
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user

    if @user.update(user_params)
      redirect_to root_path
      flash[:notice] = "Updated User Information"
    else
      render :edit
    end
  end

  def show_change_password
    @user = current_user
    render :change_password
  end

  def change_password
    @user = current_user
    
    if @user&.authenticate params[:user][:current_password]
      if params[:user][:current_password] == params[:user][:password]
        redirect_to root_path
        flash[:danger] = "Your new password is same as current password"
      elsif params[:user][:password] != params[:user][:password_confirmation]
        redirect_to root_path
        flash[:danger] = "Your new password doesn't match with password confirmation"
      elsif @user.update user_params
        flash[:success] = "Password has been updated"
        redirect_to root_path
      end
    else
      flash[:danger] = "You've enter the wrong password"
      redirect_to root_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def authorize!
    redirect_to root_path, alert: 'Not Authorized' unless can?(:crud, current_user)
  end
end
