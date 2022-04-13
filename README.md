# Garage PI

## Pins

- PIR sensor (provides motion detection)
  - 5V
  - Pin #11
  - GND
- (DISABLED) LED (provides motion detection status)
  - Pin #7
  - GND

## ENV

- CLOUD_ID
  - The Homey Cloud ID key that will be used to trigger webhooks

## Events

- Garage-Motion-Started
- Garage-Motion-Ended

## Run locally

1. Setup PI using provided pin configuration
2. Create a `.env` file with `CLOUD_ID` set
3. Run `npm start`

## Host

1. Use the provided install script
2. Set the override config to include your `CLOUD_ID`
