# Week 1 Introduction

Welcome to the **WordPress Camp** project! This project serves as a comprehensive guide to creating and managing a basic website using WordPress, HTML, CSS, and JavaScript. It includes a lecture, practical examples, and a sample project to help you understand the fundamentals of web development with WordPress.


## Introduction

This project is designed to provide a detailed walkthrough of building a simple yet functional website using WordPress, enhanced with custom HTML, CSS, and JavaScript. It is aimed at beginners who want to learn the basics of web development and WordPress customization.

## Setup

1. **File Structure**

wordpress-camp/

    ├── index.html
    ├── styles.css
    └── script.js


# WordPress Project Architecture

This diagram represents a high-level architecture of a WordPress project.

```mermaid
graph TD
    A[Client] -->|HTTP Requests| B[Web Server]
    B[Web Server] --->|PHP Execution| C[WordPress Core]
    C[WordPress Core] -->|Database Queries| D[(Database)]
    C[WordPress Core] -->|Load Themes| E[Themes]
    C[WordPress Core] -->|Load Plugins| F[Plugins]
    C[WordPress Core] -->|API Requests| G[External APIs]

    subgraph "WordPress Application"
        C[WordPress Core] ---> E[Themes]
        C[WordPress Core] ---> F[Plugins]
    end

    B[Web Server] --> H[Static Assets]
    H[Static Assets] -->|CSS/JS/Images| A[Client]

    A[Client] -->|HTTP Responses| B[Web Server]

```

# Work Flow
```mermaid
graph TD
    A[Local Development] -->|Code Changes| B[Push to GitHub]
    B[Push to GitHub] --> C[Create Pull Request]
    C[Create Pull Request] --> D[Code Review]
    D[Code Review] -->|Approve| E[Merge to Main Branch]
    D[Code Review] -->|Fail| A[Local Development]
    E[Merge to Main Branch] --> F[GitHub Actions Workflow]
    F[GitHub Actions Workflow] -->|Build and Deploy| G[AWS Lightsail]
    G[AWS Lightsail] -->|Deployed| H[Live WordPress Site]

    A --> I[Docker for Local Development]
    G --> J[Database Migration]
    J -->|Sync Cloud to Local| A
    H -->|Database Migration Plugin| J
```

# Homework
You can find the sample and repo here ⬇️

[sample link 📝](http://first-week.s3-website-ap-southeast-2.amazonaws.com/)

[repo link 📂](https://github.com/RuntaoZhuge/wordpress-camp/tree/main/week-1)


