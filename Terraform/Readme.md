# Table of Contents

1. [Infrastructure as Code (IaC) Overview](#infrastructure-as-code-iac-overview)

   - [What is IaC?](#what-is-iac)
   - [Types of IaC](#types-of-iac)
   - [Benefits of IaC](#benefits-of-iac)
   - [Approaches to Automating Infrastructure](#approaches-to-automating-infrastructure)
   - [Mutable vs Immutable Infrastructure](#mutable-vs-immutable-infrastructure)
   - [Agent vs Agentless IaC Tools](#agent-vs-agentless-iac-tools)

2. [Getting Started with Terraform](#getting-started-with-terraform)

   - [What is Terraform?](#what-is-terraform)
   - [Core Terraform Workflow](#core-terraform-workflow)
   - [Key Terraform Concepts](#key-terraform-concepts)
     - [Providers](#providers)
     - [Resources](#resources)
   - [State](#state)
     - [State File](#state-file)
     - [Backend](#backend)
     - [Commands](#commands)
   - [Variables](#variables)
   - [Outputs](#outputs)
   - [Data Sources](#data-sources)

3. [Terraform Commands](#terraform-commands)

4. [Terraform Provisioners](#terraform-provisioners)

   - [Definition](#definition)
   - [Types](#types)
   - [Example](#example)

5. [Terraform Debugging](#terraform-debugging)

   - [Logging Levels](#logging-levels)

6. [Workspaces](#workspaces)

7. [AWS VPC (Virtual Private Cloud)](#aws-vpc-virtual-private-cloud)

   - [Definition](#definition)
   - [Components](#components)
   - [Example](#example)

8. [Example: Creating Multiple AWS Providers](#example-creating-multiple-aws-providers)

9. [Terraform Best Practices](#terraform-best-practices)
   - [Example](#example-1)

# Infrastructure as Code (IaC) Overview

## What is IaC?

- **Definition**: A method to manage and provision infrastructure through code, removing the need for manual setup.
- **Benefits**:
  - Simplifies infrastructure automation, especially with pipelines.
  - Part of your codebase/repository, enabling version control and tracking.
  - Standardizes processes, reducing the reliance on informal practices by admins.
  - Improves security by facilitating scanning and vulnerability detection.
- **Templates**: IaC operates using configuration templates that define specifications for resources.

---

## Types of IaC

1. **Scripts**:
   - Simplest form of IaC.
   - Best for small, straightforward tasks.
   - Not ideal for complex infrastructure needs.
2. **Configuration Management Tools**:
   - Tools like Ansible, Puppet, and Chef.
   - Focused on managing existing infrastructure configurations.
3. **Provisioning Tools**:
   - Tools like Terraform.
   - Designed to create, update, and destroy infrastructure.
4. **Container & Templating Tools**:
   - Tools like Docker and Kubernetes.
   - Focused on managing containerized workloads.

---

## Benefits of IaC

- **Efficiency**: Automates repetitive tasks.
- **Versioning**: Tracks changes with tools like Git.
- **Speed**: Rapid infrastructure deployment and updates.
- **Collaboration**: Enables teams to work from the same configurations.
- **Eliminates Configuration Drift**: Ensures consistency across environments.
- **Scalable and Stable Environments**.
- **Disaster Recovery**: Simplifies infrastructure restoration.

---

## Approaches to Automating Infrastructure

1. **Declarative**: Defines the desired state; the tool figures out how to achieve it.
2. **Imperative**: Specifies the steps needed to achieve the desired state.

---

## Mutable vs Immutable Infrastructure

- **Mutable**:
  - Can be updated to fit business needs (patching, scaling, etc.).
- **Immutable**:
  - Cannot be changed after deployment; updates require replacement.
  - Example tools: Docker, Terraform, Kubernetes.

---

## Agent vs Agentless IaC Tools

- **Agent-based**: Requires an agent to be installed on target systems.
- **Agentless**: Operates directly over protocols like SSH (e.g., Ansible).

---

# Getting Started with Terraform

## What is Terraform?

- **Definition**: An open-source tool for IaC, enabling you to define resources (cloud/on-premises) in human-readable configuration files.
- **Features**:
  - Cloud-agnostic.
  - Declarative language: Focuses on the desired end state (HCL - HashiCorp Configuration Language).
  - Widely used in the industry for provisioning infrastructure.

---

## Core Terraform Workflow

1. **Write**: Define resources across providers.
2. **Plan**: Preview changes Terraform will make to your infrastructure.
3. **Apply**: Implement the planned changes.

---

## Key Terraform Concepts

### Providers

- **Definition**: Plugins that let Terraform interact with platforms (e.g., AWS, Azure).
- **Types**:
  - Official (e.g., AWS, Azure).
  - Community.
  - Partner.

### Resources

- **Definition**: The components of your infrastructure (e.g., servers, databases).
- **Example**:

  ```hcl
  resource "aws_instance" "example" {
    ami           = "ami-12345678"
    instance_type = "t2.micro"
  }
  ```

## State

### State File

- Tracks infrastructure state (`terraform.tfstate`).

### Backend

- The location where the state file is stored (can be local or remote, e.g., S3).

### Commands

- `terraform state show`: View resource details.
- `terraform state list`: View resources in the state.
- `terraform state rm`: Remove a resource from the state.

---

## Variables

- Definition

- Inputs to Terraform configuration that enhance flexibility and reusability.

- Example

```hcl
variable "instance_type" {
  default = "t2.micro"
}
```

## Outputs

- Definition: Values exposed to the user after apply.
- Example :

```hcl
output "instance_ip" {
  value = aws_instance.example.public_ip
}
```

## Data Sources

- Definition: Fetch data from external resources.

- Example :

```hcl
data "aws_ami" "example" {
  most_recent = true
  owners      = ["self"]
}

```

## Terraform Commands

| Command              | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `terraform init`     | Initialize working directory for Terraform.    |
| `terraform plan`     | Preview changes Terraform will make.           |
| `terraform apply`    | Apply changes to reach the desired state.      |
| `terraform destroy`  | Remove resources defined in configuration.     |
| `terraform fmt`      | Format configuration files.                    |
| `terraform validate` | Validate syntax and configuration correctness. |
| `terraform output`   | Display outputs after applying changes.        |

---

## Terraform Provisioners

### Definition

- Run scripts/commands after resources are created.

### Types

- **local-exec**: Runs locally.
- **remote-exec**: Runs remotely.

### Best Practices Example

````hcl
provisioner "local-exec" {
  command = "echo 'Provisioning complete!'"
}
## Terraform Debugging

### Logging Levels
- **TRACE**: Most verbose.
- **DEBUG**: High verbosity for actions/operations.
- **INFO**: Medium verbosity.
- **WARN**: Warnings.
- **ERROR**: Error messages.

---

## Workspaces

### Definition
- Manage multiple environments (e.g., dev, staging, production).

### Example
```bash
terraform workspace new production
````

## AWS VPC (Virtual Private Cloud)

### Definition

- An isolated virtual network in AWS.

### Components

- **Subnet**: IP range within a VPC.
- **Internet Gateway**: Connects VPC to the public internet.
- **Security Groups**: Firewalls for inbound/outbound traffic.
- **VPC Endpoint**: Connects VPC to AWS services privately.

### Example

````hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

## Example: Creating Multiple AWS Providers

### Code Example
```hcl
provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  region = "us-east-2"
  alias  = "ohio"
}

resource "aws_vpc" "n_virginia_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_vpc" "ohio_vpc" {
  cidr_block = "10.1.0.0/16"
  provider   = aws.ohio
}
````

## Terraform Best Practices

- **Use version control**: Track and manage Terraform configurations using tools like Git.
- **Leverage modules**: Create reusable infrastructure blocks to promote consistency and efficiency.
- **Define variables**: Enhance flexibility and reusability in configurations by using variables.
- **Store state remotely**: Use a remote backend (e.g., S3) and enable state locking to prevent conflicts.
- **Use workspaces**: Manage multiple environments (e.g., dev, staging, production) with workspaces.
- **Regularly validate and format files**: Use `terraform validate` and `terraform fmt` to ensure syntax correctness and maintain readability.

### Example

```vbnet
' Example usage of best practices in a Terraform configuration.
variable "region" {
  description = "AWS Region"
  default     = "us-east-1"
}

module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
}

terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}
```
