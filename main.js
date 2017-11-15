$(document).ready(function(){
		$('#add_category').submit(addCategory);
		$('#edit_category').submit(editCategory);
		
		
		
		
		$('#add_task').submit(addTask);
		$('#edit_task').submit(editTask);
		
		
		$('body').on('click', '.btn-edit-category', setCategory);
		$('body').on('click', '.btn-delete-category', deleteCategory);
		
		$('body').on('click', '.btn-edit-task', setTask);
		$('body').on('click', '.btn-delete-task', deleteTask);
});

var api_key = 'L4SXKBw_v9ZBpZPX-QytgmqQJMxk047R';

function getCategoryOptions(){
	$.get('https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey='+api_key, function(data){ 
		var output;
		$.each(data, function(key, data){
			console.log(data);
			output += '<option value = "'+data.category_name+'">'+data.category_name+'</option>';
		})
		$('#category').append(output);
	});
}

function getCategories(){
	//alert(1);
	$.get('https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey='+api_key, function(data){ 
		var output = '<ul class="list-group">';
		$.each(data, function(key, data){
			output += '<li class = "list-group-item category">'+
			data.category_name+ '<div class="pull-right"><a class="btn btn-primary btn-edit-category" data-category-id= "'+data._id.$oid+'" >Edit</a> <a class="btn btn-danger btn-delete-category" data-category-id= "'+data._id.$oid+'" >Delete</a></div>'+
			'</li>';
		})
		
		output += '</ul>';
		$('#categories').html(output);
	});
	
}

function addCategory(){
	var category_name = $('#category_name').val();
	//alert(category_name);
	//Ajax Post Request
	$.ajax({
		url:'https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey='+api_key,
		data : JSON.stringify({ 
			"category_name" : category_name
		}), 
		type : 'POST',
		contentType: "application/json",
		success : function(data){
			window.location.href= 'categories.html';
		}, 
		error: function(xhr, status, err){
			console.log(err);
		}
	});
	return false;
}

function setCategory(){
	var category_id = $(this).data('category-id');
	//alert(category_id);
	sessionStorage.setItem('currentCategoryId', category_id);
	window.location.href='editcategory.html';
	return false;
}

function getCategory(){
	var category_id = sessionStorage.getItem('currentCategoryId');
	$.get('https://api.mlab.com/api/1/databases/taskmanager/collections/categories/'+category_id+'?apiKey='+api_key, function(data){
			$('#category_name').val(data.category_name);
			
	});
}

function editCategory(){
	var category_id = sessionStorage.getItem('currentCategoryId');
	var category_name = $('#category_name').val();
	//alert(category_name);
	//Ajax Post Request
	$.ajax({
		url:'https://api.mlab.com/api/1/databases/taskmanager/collections/categories/'+category_id+'?apiKey='+api_key,
		data : JSON.stringify({ 
			"category_name" : category_name
		}), 
		type : 'PUT',
		contentType: "application/json",
		success : function(data){
			window.location.href= 'categories.html';
		}, 
		error: function(xhr, status, err){
			console.log(err);
		}
	});
	return false;
}

function deleteCategory(){
	var category_id = $(this).data('category-id');
	$.ajax({
		url:'https://api.mlab.com/api/1/databases/taskmanager/collections/categories/'+category_id+'?apiKey='+api_key,
		
		type : 'DELETE',
		async : true,
		timeout: 3000000,
		success : function(data){
			window.location.href= 'categories.html';
		}, 
		error: function(xhr, status, err){
			console.log(err);
		}
	});
	

	return false;
}

function addTask(){
	var task_name = $('#task_name').val();
	var category = $('#category').val();
	var due_date = $('#due_date').val();
	var is_urgent = $('#is_urgent').val();
	//alert(category_name);
	//Ajax Post Request
	$.ajax({
		url:'https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey='+api_key,
		data : JSON.stringify({ 
			"task_name" : task_name,
			"category" : category,
			"due_date" : due_date,
			"is_urgent" : is_urgent,
		}), 
		type : 'POST',
		contentType: "application/json",
		success : function(data){
			window.location.href= 'index.html';
		}, 
		error: function(xhr, status, err){
			console.log(err);
		}
	});
	return false;
}

function editTask(){
	alert('Welcome to Edit Task');
	var task_id = sessionStorage.getItem('currentTaskId');
	alert(task_id);
	console.log('task_id');
	var task_name = $('#task_name').val();
	var category = $('#category').val();
	var due_date = $('#due_date').val();
	var is_urgent = $('#is_urgent').val();
	
	alert(task_name);
	$.ajax({
		url:'https://api.mlab.com/api/1/databases/taskmanager/collections/tasks/'+task_id+'?apiKey='+api_key,
		data : JSON.stringify({ 
			"task_name":task_name,
			"category":category,
			"due_date":due_date,
			"is_urgent":is_urgent,
		}), 
		type : "PUT",
		contentType: "application/json",
		success : function(data){
			window.location.href= "index.html";
		}, 
		error: function(xhr, status, err){
			console.log(err);
		}
	});
	return false;
}

function deleteTask(){
	 var task_id = $(this).data('task-id');
	 $.ajax({
		url:'https://api.mlab.com/api/1/databases/taskmanager/collections/tasks/'+task_id+'?apiKey='+api_key,		
		type : 'DELETE',
		async : true,
		timeout: 3000000,
		success : function(data){
			window.location.href= 'index.html';
		}, 
		error: function(xhr, status, err){
			console.log(err);
		}
	 });
	 
	 return false;
}



function setTask(){
	// this('You are in Edit Task');
	var task_id = $(this).data('task-id');
	//alert(task_id);
	console.log('Task Set : ' +task_id);
	sessionStorage.setItem('currentTaskId', task_id);
	alert('Redirecting to Edit Task HTML Page');
	window.location.href = 'edittask.html';
	return false;
}



function getTask(){	
	$.get('https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey='+api_key, function(data){ 
		var output = '<ul class="list-group">';
		//alert(output);
		$.each(data, function(key, data){
			output += '<li class = "task list-group-item">';
			//alert(output);
			output += data.task_name+'<span class="due_on">&nbsp[Due on '+data.due_date+']&nbsp</span>';
			//alert(output);
				if(data.is_urgent == "yes"){
					output += ' <span class="label label-danger"> Urgent </span>';
					alert(output);
					//alert(output);
				}
			output += '<div class="pull-right"><a class="btn btn-primary btn-edit-task" data-task-name="'+data.task_name+'"  data-task-id="'+data._id.$oid+'">Edit</a> <a class="btn btn-danger btn-delete-task" data-task-id="'+data._id.$oid+'">Delete</a></div>';
			output += '</li>';
			//alert(output);
		})
		output += '</ul>';
		$("#tasks").html(output);
		//alert(output);
	});
	
}

