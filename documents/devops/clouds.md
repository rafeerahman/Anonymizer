# Cloud documentation for University of Toronto Anonymization API

## Introduction

The University of Toronto Anonymization API is a cloud-based solution designed to help researchers and organizations protect the privacy of individuals in their datasets. By deploying the API on a cloud platform, users can easily access and utilize the API's powerful anonymization capabilities from anywhere in the world. This documentation provides a comprehensive guide to deploying the API on a cloud platform, including instructions for choosing a cloud provider, configuring the API, and managing the deployment. With this guide, users can deploy the Anonymization API quickly and securely, enabling them to protect sensitive information and conduct analyses with confidence.

## Choosing a Cloud Provider

When deploying the University of Toronto Anonymization API, one of the first decisions to make is which cloud provider to use. There are several cloud providers to choose from, including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Each provider has its own strengths and weaknesses, so it's important to carefully evaluate the options before making a decision.

## Google Cloud Platform

For this project, we have chosen to use GCP for its robust security features, high performance, and scalability. GCP offers a wide range of services and tools for cloud deployment, including virtual machines, containerization, and serverless computing options. Additionally, GCP provides a strong network infrastructure and a range of compliance certifications, making it a good choice for organizations with strict data security and privacy requirements.

We use several GCP services to deploy the Anonymization API, including Cloud Run, Artifact Registry, and Cloud Build. These services are described in more detail below.

### Cloud Run 

Cloud Run is a fully managed platform that allows you to build and deploy scalable containerized apps written in any language, including Go, Python, Java, Node.js, .NET, and Ruby. With Cloud Run, you don't need to worry about infrastructure management or scaling, since it automatically scales up or down based on traffic.

###  Artifact Registry API 

The Artifact Registry API is a fully managed container registry service that allows you to store, manage, and secure your container images. With Artifact Registry, you can store your container images in a private registry, which means you can easily share them with other users and deploy them to Cloud Run.

Please note that the Artifact Registry API will start charging you for storage after you have used 0.5 GB of storage. To avoid this, you can use the Cloud Build API to build and deploy your container images directly from your GitHub repository.

To ensure the portability of this project, we have chosen to use the Artifact Registry API to store our container images.

