class WebpushService
  def initialize(user_id: nil)
    @user_id = user_id
  end

  def webpush_clients(message)
    devices.each do |device|
      webpush device, message
    end
  end

  def webpush(device, message)
    Webpush.payload_send(
      message: message,
      endpoint: device.endpoint,
      p256dh: device.p256dh,
      auth: device.auth,
      ttl: 24 * 60 * 60,
      vapid: {
        public_key: ENV['VAPID_PUBLIC_KEY'],
        private_key: ENV['VAPID_PRIVATE_KEY']
      }
    )
  end

  private

  def devices
    @user_id.present? ? Device.where(user_id: @user_id) : [] # Device.all <- 全部に送るのは流石にアレなので書き換え
  end
end
