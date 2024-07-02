## To-Do App on AWS

### Deploying on AWS EC2

#### Setting up AWS EC2 Instance

1. **Launch an EC2 instance**

   - Go to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/)
   - Click "Launch Instance"
   - Choose "Amazon Linux 2 AMI (HVM)"
   - Choose an instance type (t2.micro is free tier eligible)
   - Configure instance details and add storage as needed
   - Add a tag (optional)
   - Configure security group:
     - Add a rule to allow HTTP traffic on port 80
     - Add a rule to allow traffic on port 5000
     - Add a rule to allow SSH traffic on port 22 (for connecting to your instance)
   - Review and launch your instance, then download the key pair for SSH access.

2. **Connect to your instance**
   - Open a terminal
   - Connect to your instance using SSH
   ```bash
   ssh -i /path/to/your-key-pair.pem ec2-user@your-instance-public-dns
   ```

#### Installing Node.js and npm on AWS

1. **Update packages and install Node.js and npm**
   ```bash
    sudo yum update -y
    sudo yum install -y nvm 

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash  
    nvm install 17
    ```

2. **Verify the installation**
   ```bash
   node -v
   npm -v
   ```

#### Deploying the Application

1. **Clone your repository on the EC2 instance**

   ```bash
   git clone https://github.com/mdnumanraza/aws-todo.git
   cd aws-todo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```bash
   touch .env
   ```

   Add your MongoDB Atlas connection string and port number to the `.env` file.

   ```plaintext
   MONGO_URI=<your_mongodb_atlas_connection_string>
   PORT=5000
   ```

4. **Start the application**

   ```bash
   node index.js
   ```

5. **Set up a process manager (optional but recommended)**
   - Install `pm2` to keep your application running.
   ```bash
   sudo npm install -g pm2
   ```
   - Start your application with `pm2`.
   ```bash
   pm2 start app.js --name todo-app
   pm2 startup
   pm2 save
   ```

#### Exposing Port 5000

1. **Modify security group**

   - Ensure your EC2 instance's security group allows inbound traffic on port 5000.

2. **Access your application**
   - Open a browser and go to `http://<ec2_public_ip>:5000`

### Acknowledgements

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [AWS](https://aws.amazon.com/)

### Features

- Add tasks
- Delete tasks

### Prerequisites

- Node.js and npm
- MongoDB Atlas account
- AWS EC2 instance running Amazon Linux 2
