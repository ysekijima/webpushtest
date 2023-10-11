class HomeController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
  end

  def post1
    WebpushService.new(user_id: current_user.id).webpush_clients('post1')
    redirect_to root_path and return
  end

  def post2
    WebpushService.new(user_id: current_user.id).webpush_clients('post2')
    redirect_to root_path and return
  end
end
