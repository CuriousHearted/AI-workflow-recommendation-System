// Variables
let workflowList = document.getElementById('workflowList');
let notificationList = document.getElementById('notificationList');
let tasksContainer = document.getElementById('tasksContainer');
let addTaskBtn = document.getElementById('addTaskBtn');
let workflowDetailsText = document.getElementById('workflowDetailsText');

// Event Listeners
document.getElementById('workflowForm').addEventListener('submit', createWorkflow);
addTaskBtn.addEventListener('click', addTask);

// Create a new workflow and append it to the workflow list
function createWorkflow(e) {
  e.preventDefault();

  let workflowName = document.getElementById('workflowName').value;
  let workflowDescription = document.getElementById('workflowDescription').value;
  let tasks = Array.from(tasksContainer.querySelectorAll('.task input[type="text"]:nth-child(1)')).map(input => input.value);
  let assignedTo = Array.from(tasksContainer.querySelectorAll('.task input[type="text"]:nth-child(2)')).map(input => input.value);

  // Create workflow element
  let li = document.createElement('li');
  li.innerHTML = `<strong>${workflowName}</strong><br>Tasks: ${tasks.join(', ')}<br>Assigned to: ${assignedTo.join(', ')}`;
  li.addEventListener('click', () => showWorkflowDetails(workflowName, workflowDescription, tasks, assignedTo));

  // Append to workflow list
  workflowList.appendChild(li);

  // Push notification for workflow creation
  addNotification(`Workflow "${workflowName}" created!`);

  // Clear form
  document.getElementById('workflowForm').reset();
  tasksContainer.innerHTML = `<div class="task"><input type="text" placeholder="Task Name" required><input type="text" placeholder="Assigned To" required></div>`;
}

// Add a new task field to the workflow form
function addTask() {
  let div = document.createElement('div');
  div.className = 'task';
  div.innerHTML = `<input type="text" placeholder="Task Name" required><input type="text" placeholder="Assigned To" required>`;
  tasksContainer.appendChild(div);
}

// Show workflow details when a workflow is clicked
function showWorkflowDetails(name, description, tasks, assignedTo) {
  workflowDetailsText.innerHTML = `<strong>Workflow Name:</strong> ${name}<br>
                                   <strong>Description:</strong> ${description || 'No description provided.'}<br>
                                   <strong>Tasks:</strong> ${tasks.join(', ')}<br>
                                   <strong>Assigned to:</strong> ${assignedTo.join(', ')}`;
}

// Add a new notification to the notification list
function addNotification(message) {
  let li = document.createElement('li');
  li.innerText = message;
  notificationList.appendChild(li);

  // Auto-remove notifications after 5 seconds
  setTimeout(() => {
    notificationList.removeChild(li);
  }, 5000);
}
