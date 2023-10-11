class ApplicationController < ActionController::Base

  helper_method :vapid_public_key

  def vapid_public_key
    @decoded_vapid_public_key ||= Base64.urlsafe_decode64(ENV['VAPID_PUBLIC_KEY']).bytes
  end

  def after_sign_in_path_for(resource)
    root_path
  end

end
