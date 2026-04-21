# Product-Price-Tracker

## About the product price tracker

A personal assignment to create a RESTful web service that allows users to enter a product URL and set a price drop alert

## Quick start

### Building the application

Install the dependencies:

```sh
  npm install
```

Build the app

```sh
  npm run build
```

### Running the application

```sh
npm run dev
```

Then the application can be invoked though those RESTful endpoints: product, users, watching for alerts

#### Public facing endpoint

* POST `http://localhost:8000/watching`  

The request body must be in JSON format and contain the following parameters:

* **productId** (string): The unique identifier for the product the user wants to watch.
* **userEmail** (string): The email address of the user who is setting the alert.
* **desiredPrice** (number): The price at which the user wants to be notified.
* **fullDayAlert** (boolean): Indicates if the user wants to receive alerts throughout the day.
* **nightAlert** (boolean): Indicates if the user wants to receive alerts during the night.
* **morningAlert** (boolean): Indicates if the user wants to receive alerts in the morning.

---

Example Request Body

```json
{
  "productId": "746a83c7-9cfd-440a-90c8-f57438",
  "userEmail": "example1@email.com",
  "desiredPrice": 100,
  "fullDayAlert": true,
  "nightAlert": true,
  "morningAlert": true
}
```

Example Response:

```json
{
  "productId": "746a83c7-9cfd-440a-90c8-f57438",
  "userEmail": "<example1@email.com>",
  "desiredPrice": 100,
  "fullDayAlert": true,
  "morningAlert": true,
  "nightAlert": true
}

```

![1755027241418](image/README/1755027241418.png)

#### Administrative operations

* POST `http://localhost:8000/mock-alert`

This endpoint is designed to mock the actual alert services which is trigger by schedules time.
So we able to test the alert services without waiting the timer started.
It accept the Request Body

```json

{
  "alertType": "fullDay"
}

```

This assignment using logging as mock emails services
pretend to send alerts to users:

![1755026679199](image/README/1755026679199.png)

Response:

```json

{
    "message": "Alerts sent successfully"
}

```

* `http://localhost:8000/products` Methods: get, put, delete, post
* `http://localhost:8000/users` Methods: get

Those 2 API endpoints are for administrative purpose to create products and users.

### Scheduled Cron Jobs

This application uses two scheduled cron jobs to automatically send price drop alerts to users based on their alert preferences:

#### Morning Alert

Schedule: Every day at 8:00 AM
Function: Triggers the sendAlert("day") function, which checks all watching records where either fullDayAlert or dayAlert is enabled. If a product’s price drops below the user’s desired price, an alert email is sent.

#### Night Alert

Schedule: Every day at midnight (00:00)
Function: Triggers the sendAlert("night") function, which checks all watching records where either fullDayAlert or nightAlert is enabled. If a product’s price drops below the user’s desired price, an alert email is sent.

## Contributions

We operate a [code of conduct](CODE_OF_CONDUCT.md) for all contributors.

See our [contributing guide](CONTRIBUTING.md) for guidance on how to contribute.

## License

Released under the [Apache 2 license](LICENCE.txt).
