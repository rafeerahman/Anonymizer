# Cloud Deployment documentation for University of Toronto Anonymization API

## Introduction

The University of Toronto Anonymization API is a cloud-based solution designed to help researchers and organizations protect the privacy of individuals in their datasets. By deploying the API on a cloud platform, users can easily access and utilize the API's powerful anonymization capabilities from anywhere in the world. This documentation provides a comprehensive guide to deploying the API on a cloud platform, including instructions for choosing a cloud provider, configuring the API, and managing the deployment. With this guide, users can deploy the Anonymization API quickly and securely, enabling them to protect sensitive information and conduct analyses with confidence.

## Choosing a Cloud Provider

When deploying the University of Toronto Anonymization API, one of the first decisions to make is which cloud provider to use. There are several cloud providers to choose from, including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Each provider has its own strengths and weaknesses, so it's important to carefully evaluate the options before making a decision.

## Google Cloud Platform

For this project, we have chosen to use GCP for its robust security features, high performance, and scalability. GCP offers a wide range of services and tools for cloud deployment, including virtual machines, containerization, and serverless computing options. Additionally, GCP provides a strong network infrastructure and a range of compliance certifications, making it a good choice for organizations with strict data security and privacy requirements.

We use several GCP services to deploy the Anonymization API, including Cloud Run and Cloud Storage.

### Cloud Run 

Cloud Run is a fully managed platform that allows you to build and deploy scalable containerized apps written in any language, including Go, Python, Java, Node.js, .NET, and Ruby. With Cloud Run, you don't need to worry about infrastructure management or scaling, since it automatically scales up or down based on traffic.

### Cloud Storage

Cloud Storage is a highly scalable object storage service that allows you to store and access data from anywhere in the world. Cloud Storage is designed to be highly durable and highly available, so you can be confident that your data is safe and secure. In this project, we use Cloud Storage to store the docker image for the Anonymization API.

## Architecture overview

The following diagram shows the architecture of the Anonymization API on GCP.

![](./2023-02-18-14-22-39.png)

## Deploying the Anonymization API

The docker build and deployment process is automated using a GitHub Actions workflow called `GCP-Deploy.yml`. The workflow is manually triggered. The workflow builds the docker image and pushes it to Cloud Storage. Then, the workflow deploys the image to Cloud Run.

More explaination of the workflow can be found at <https://cloud.google.com/community/tutorials/cicd-cloud-run-github-actions>

## Managing the Deployment

After successfully deploying the Anonymization API, you can manage the deployment using the GCP console. To get the URL of the API, run the following command:


```
gcloud run services list
```

This command lists all the services deployed on Cloud Run. You can use the `--platform` flag to specify the platform, e.g. `gcloud run services list --platform managed` to list all the services deployed on Cloud Run (fully managed).

> After you finish testing the API, remember to delete the deployment to avoid unnecessary costs. 