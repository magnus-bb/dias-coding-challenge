# DIAS coding challenge

## Usage
### Prerequisites
To run this demo, you must have `docker` & `docker-compose` installed on your system.

I also recommend installing Postman and importing `./DIAS.postman_collection.json` to easily send requests to the API. All requests used in this demo are included in the Postman collection.

You can optionally install MongoDB Compass to easily see the data being created and get IDs that you need for requests (all necessary IDs will also be returned from requests when creating entries).

### Guide
Disclaimer: the actual IDs in the following demo will not always match, since the sections have been collated from several different requests. You will need to substitute `doctorId`s manually, but you should be able to keep the `patientCpr` since that is not generated on creation.

#### Setup
Clone this repository anywhere on your computer. `cd` into the root of the project and run:

```bash
docker-compose up
```

This will build and run two docker containers, one with the Node.js API server, and one with a boilerplate MongoDB document database.

For simplicity, the API container mounts the API source code as a volume for development purposes, but the MongoDB container does not mount a volume for persisting the data, to not necessitate deleting the created demo-data after use.

MongoDB Compass should connect to `mongodb://localhost:27017` if you wish to see the data with a GUI.

#### Creating doctors and patients
Sending a `POST` request to `localhost:8080/doctors` with the following JSON payload will create a new doctor in the cardiology department:

```json
{
  "name": "Mr. Doctor",
  "department": "cardiology"
}
```

The return value is the created entry in MongoDB:
```json
{
  "department": "cardiology",
  "name": "Mr. Doctor",
  "_id": "6238ea49d892848fca2de27d",
  "__v": 0
}
```

We copy the `_id` to be able to reference this doctor when we assign him to his first patient!

Sending a `POST` request to `localhost:8080/patients` with the following JSON payload will admit a new patient to the cardiology department:

```json
{
  "department": "cardiology",
  "journal": {
    "cpr": "012345-6789",
    "name": "Mr. Patient"
  }
}
```

The return value is the created entry in MongoDB:
```json
{
  "department": "cardiology",
  "doctors": [],
  "journal": {
    "cpr": "012345-6789",
    "name": "Mr. Patient",
    "_id": "6238ed212566aa1b8998cf25"
  },
  "_id": "6238ed212566aa1b8998cf24",
  "__v": 0
}
```

The `doctors` array is still empty, since no doctor has been assigned to this poor man, yet!

#### Assigning doctors to patients
Sending a `PATCH` request to `localhost:8080/assignDoctor` with the following JSON payload will assign the created doctor to our recently admitted patient in the cardiology department:

```json
{
  "doctorId": "6238ea49d892848fca2de27d",
  "patientCpr": "012345-6789"
}
```

The `doctorId` is copied from when the doctor was created.

If the doctor and patient are not from the same department, you will instead see the following `400 Bad Request` response:

```json
{
  "message": "doctor with ID: 6238ea49d892848fca2de27d from department: not cardiology does not have access to patient with CPR: 012345-6789 in department: cardiology"
}
```

You should now be able to see the doctor being assigned to the admitted patient in the `doctors` array:

```json
{
  "department": "cardiology",
  "doctors": [
    "6238ea3ed892848fca2de27b" <----- Mr. Doctor
  ],
  "journal": {
    "cpr": "012345-6789",
    "name": "Mr. Patient",
    "_id": "6238ea4fd892848fca2de280"
  },
  "_id": "6238ea4fd892848fca2de27f",
  "__v": 0
}
```

#### Seeing doctors and patients
To see all patients assigned a Mr. Doctor, send a `GET` request to `localhost:8080/patients?doctorId=6238ea49d892848fca2de27d`

You can also see all doctors assigned to our new patient with a `GET` request to `localhost:8080/doctors?patientCpr=012345-6789`

#### Doctors seeing their own patient
Mr. Doctor could only be assigned to patients from the cardiology department, and he can only access the journals of patients he is directly assigned to. To see Mr. Doctor's singular patient, he can send a `GET` request to `localhost:8080/patient?patientCpr=012345-6789&doctorId=6238ea49d892848fca2de27d`.

If Mr. Doctor is in the `doctors` array of the specified patient, he will get the following response: 

```json
{
  "_id": "6238ea4fd892848fca2de27f",
  "department": "cardiology",
  "doctors": [
    "6238ea3ed892848fca2de27b"
  ],
  "journal": {
    "cpr": "012345-6789",
    "name": "Mr. Patient",
    "_id": "6238ea4fd892848fca2de280"
  },
  "__v": 0
}
```

If the doctor is not assigned this specific patient, they will get a `403 Forbidden` response:

```json
{
  "message": "doctor with id: 6238ea49d892848fca2de27d does not have access to patient with CPR: 012345-6789"
}
```

### Errors
Some endpoints will handle errors gracefully, which is not shown in the demo (non-existing IDs etc.), but it is by no means robust.

## Changes to make
* Change logic to be a `Department` with `Doctors` and `Admissions` (patients) and use a relational db instead
* Use TypeScript
  * E.g., for controlling inputs to `Admissions` when adding a doctor which should be of type `Doctor`
* Setup docker for something other than quick development
  * Mount mongo volume
  * Unmount API source-code volume
  * Use `PM2` for API
  * Not use `nodemon`
  * etc..
* Work on error handling
  * E.g., what if a doctor already exists on creation, what if the required args are not passed to constructors?
  * Returning err.message sometimes shows some backend logic, we probably want to define our own errors more carefully
  * Distinguish between error codes
    * Client errors should return 400, but it would be a good idea to also correctly send a 5xx if e.g., there was a problem connecting to DB
* Put more logic in classes - keeping it in controllers is faster to demo
  * E.g., let the `Admission` class handle updating the `doctors`-array and updating database