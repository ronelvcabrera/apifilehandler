** API File Handler **

Node js boiler plate express application for handling file upload and download


## Installation

### Clone

```
git clone https://github.com/ronelvcabrera/apifilehandler.git
```

### Setup
```
$ npm install

```
### Environment Variables
Copy and rename `.sample.env` to `.env`
`PROVIDER` - can be `local` for local storage or `google` for Googole Cloud Storage

API File Handler is using Mongo DB as a its database and will need a connection for it. Hence, the environment variables.


### Google Cloud Integration
If you plan to upload files to Google Cloud, follow steps below:
Copy and rename `google-cloud-account.sample.json` `google-cloud-account.json`
Fill in the data or just copy and paste the contet that was sent to you by Google Cloud Credentials (Service Accounts)

```
{
	"type": "",
	"project_id": "",
	"private_key_id": "",
	"private_key": "",
	"client_email": "",
	"client_id": "",
	"auth_uri": "",
	"token_uri": "",
	"auth_provider_x509_cert_url": "",
	"client_x509_cert_url": ""
}

```

### Run Project
```
$ npm start
```
