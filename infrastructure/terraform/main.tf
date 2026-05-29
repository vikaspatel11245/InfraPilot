provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "infrapilot_sg" {
  name        = "infrapilot-sg"
  description = "InfraPilot main security group"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "infrapilot_server" {
  ami           = "ami-0c7217cdde317cfec"
  instance_type = "t3.medium"
  security_groups = [aws_security_group.infrapilot_sg.name]

  tags = {
    Name = "InfraPilot-Agent-Server"
  }
}
