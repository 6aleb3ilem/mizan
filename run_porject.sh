#!/bin/bash

# Function to start both projects
start() {
    echo "Starting AngularJS frontend and Spring Boot backend..."
    
    # Navigate to frontend directory
    cd accesmizanfrontend-main
    
    # Start AngularJS frontend
    ng serve -o &
    
    # Navigate to backend directory
    cd ../accesmizanbackend-main
    
    # Start Spring Boot backend
    mvn spring-boot:run &
    
    echo "Both projects started successfully."
}

# Function to stop both projects
stop() {
    echo "Stopping AngularJS frontend and Spring Boot backend..."
    
    # Find PIDs for both processes
    PID_FRONTEND=$(pgrep -f "ng serve")
    PID_BACKEND=$(pgrep -f "mvn spring-boot:run")
    
    # Kill both processes
    kill $PID_FRONTEND
    kill $PID_BACKEND
    
    echo "Both projects stopped successfully."
}

# Main execution
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac

