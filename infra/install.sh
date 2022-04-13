sudo cp ./systemd-config.ini /etc/systemd/system/garage-pi.service

sudo systemctl edit garage-pi

sudo systemctl enable systemd-networkd-wait-online.service
sudo systemctl enable garage-pi