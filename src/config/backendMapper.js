import { API_BACKEND } from "./api";

// ************************************ //
// *************** USER *************** //
// ************************************ //

// Function to map user updates objects before sending to the backend
export function mapUserUpdatesForBackend(updates) {
    if (API_BACKEND == "python") {
        return {
            email: updates.email,
            phone: updates.phone,
            role: updates.role,
            task_ids: updates.taskIds,
            password: updates.password
        };
    }

    if (API_BACKEND == "dotnet") {
        return {
            Email: updates.email,
            Phone: updates.phone,
            Role: updates.role,
            TaskIds: updates.taskIds,
            Password: updates.password
        };
    }
};

// Function to map the receiving user data (i.e: useUserById)
export function mapUserReadForBackend(userData) {
    if (API_BACKEND == "python"){
        return {
            id: userData.id,
            name: userData.name,
            firstname: userData.firstname,
            email: userData.email,
            phone: userData.phone,
            taskIds: userData.task_ids,
            role: userData.role
        };
    }

    if (API_BACKEND == "dotnet"){
        return {
            id: userData.id,
            name: userData.name,
            firstname: userData.firstname,
            email: userData.email,
            phone: userData.phone,
            taskIds: userData.taskIds,
            role: userData.role
        };
    }
};

// *************************************** //
// *************** PROJECT *************** //
// *************************************** //

// Function to map the receivng project data (i.e: useProjectById)
export function mapProjectReadForBackend(projectData) {
    if (API_BACKEND == "python") {
        return {
            id: projectData.id,
            title: projectData.title,
            description: projectData.description,
            comment: projectData.comment,
            taskIds: projectData.task_ids,
            status: projectData.status
        };
    }

    if (API_BACKEND == "dotnet") {
        return {
            id: projectData.id,
            title: projectData.title,
            description: projectData.description,
            comment: projectData.comment,
            taskIds: projectData.taskIds,
            status: projectData.status
        };
    }
};

// ************************************ //
// *************** TASK *************** //
// ************************************ //

// Function to map task create objects before sending to the backend
export function mapTaskCreateForBackend(task) {
    if (API_BACKEND == "python") {
        return {
            title: task.title,
            description: task.description,
            comment: task.comment,
            project_id: task.projectId ? parseInt(task.projectId, 10) : "",  // "10" indique qu'on lit en base décimale
            user_id: task.userId ? parseInt(task.userId, 10) : "", // si vide, supprimé ensuite par cleanObject(object)
            status: task.status ? task.status : "" // si vide, supprimé ensuite par cleanObject(object)
        };
    }

    if (API_BACKEND == "dotnet") {
        return {
            Title: task.title,
            Description: task.description,
            Comment: task.comment,
            ProjectId: task.projectId ? parseInt(task.projectId, 10) : "",
            UserId: task.userId ? parseInt(task.userId, 10) : "",
            Status: task.status ? task.status : ""
        };
    }
};

// Function to map task updates before sending to the backend
export function mapTaskUpdatesForBackend(updates) {
    if (API_BACKEND == "python") {
        return {
            title: updates.title,  // Equivalent à title: title
            description: updates.description,
            comment: updates.comment,
            user_id: updates.userId,  // noms différents back/front
            status : updates.status
        };
    }

    if (API_BACKEND == "dotnet") {
        return {
            Title: updates.title,
            Description : updates.description,
            Comment: updates.comment,
            UserId: updates.userId,
            Status: updates.status
        };
    }
};

// Function to map the receiving data (i.e: useTaskById)
export function mapTaskReadForBackend(taskData) {
    if (API_BACKEND == "python") {
        return {
            id: taskData.id,
            title: taskData.title,
            description: taskData.description,
            comment: taskData.comment,
            projectId: taskData.project_id,
            userId: taskData.user_id,
            status: taskData.status
        };
    }

    if (API_BACKEND == "dotnet") {
        return {
            id: taskData.id,
            title: taskData.title,
            description: taskData.description,
            comment: taskData.comment,
            projectId: taskData.projectId,
            userId: taskData.userId,
            status: taskData.status
        };
    }
};