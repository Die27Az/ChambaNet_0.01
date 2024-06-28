// Lógica de manejo de eventos y funcionalidades
$(document).ready(function() {
    // Array para almacenar los trabajos
    let jobs = [];
  
    // Función para agregar un trabajo desde el modal
    $('#jobForm').submit(function(event) {
      event.preventDefault();
      
      // Obtener los valores del formulario
      let title = $('#jobTitle').val();
      let employer = $('#jobEmployer').val();
      let location = $('#jobLocation').val();
      let payment = $('#jobPayment').val();
      let description = $('#jobDescription').val();
      
      // Crear objeto trabajo
      let job = {
        title: title,
        employer: employer,
        location: location,
        payment: payment,
        description: description
      };
  
      // Agregar trabajo al array
      jobs.unshift(job); // Agrega al inicio para mostrar los últimos trabajos primero
  
      // Limpiar formulario
      $('#jobForm')[0].reset();
  
      // Cerrar el modal
      $('#addJobModal').modal('hide');
  
      // Actualizar la lista de trabajos
      updateJobsList();
    });
  
    // Función para actualizar la lista de trabajos
    function updateJobsList() {
      $('#jobsList').empty();
      jobs.forEach(function(job, index) {
        let card = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <p class="card-text"><strong>Empleador:</strong> ${job.employer}</p>
              <p class="card-text"><strong>Dirección:</strong> ${job.location}</p>
              <p class="card-text"><strong>Pago:</strong> ${job.payment}</p>
              <p class="card-text"><strong>Descripción:</strong> ${job.description}</p>
              <button class="btn btn-success btn-sm btn-accept-job" data-index="${index}" data-toggle="modal" data-target="#acceptJobModal">Aceptar Trabajo</button>
            </div>
          </div>
        `;
        $('#jobsList').append(card);
      });
  
      // Agregar evento al botón de Aceptar Trabajo
      $('.btn-accept-job').click(function() {
        let index = $(this).data('index');
        let job = jobs[index];
        
        // Mostrar información del trabajo en el modal de aceptar trabajo
        $('#jobDetails').html(`
          <p><strong>Título:</strong> ${job.title}</p>
          <p><strong>Empleador:</strong> ${job.employer}</p>
          <p><strong>Dirección:</strong> ${job.location}</p>
          <p><strong>Pago:</strong> ${job.payment}</p>
          <p><strong>Descripción:</strong> ${job.description}</p>
        `);
      });
    }
  
    // Evento del botón Realizar Trabajo en el modal de aceptar trabajo
    $('#btnPerformJob').click(function() {
      // Implementar lógica para realizar trabajo
      let index = $('.btn-accept-job').data('index');
      let job = jobs[index];
      
      // Sumar el pago al total en el navbar
      let currentTotal = parseInt($('.navbar-total').text().replace('Total: ', ''));
      let payment = parseInt(job.payment);
      let newTotal = currentTotal + payment;
      $('.navbar-total').text(`Total: ${newTotal} CL`);
  
      // Sumar +1 a Trabajos Realizados en el navbar
      let currentJobs = parseInt($('.navbar-jobs').text().replace('Trabajos: ', ''));
      let newJobs = currentJobs + 1;
      $('.navbar-jobs').text(`Trabajos: ${newJobs}`);
  
      // Eliminar el trabajo de la lista
      jobs.splice(index, 1);
      updateJobsList();
  
      // Cerrar el modal de aceptar trabajo
      $('#acceptJobModal').modal('hide');
    });
  
    // Evento del botón de Iniciar Sesión
    $('#loginForm').submit(function(event) {
      event.preventDefault();
      
      // Simular inicio de sesión exitoso (solo demostrativo)
      let username = $('#username').val();
      // Mostrar nombre de usuario en el navbar
      $('.navbar').append(`<span class="ml-auto mr-3 text-light font-weight-bold">${username}</span>`);
      // Mostrar avatar (imagen o icono) en el navbar (solo demostrativo)
      //$('.navbar').append('<img src="C:\Users\Diego\Desktop\chamba (1)\chamba\img\pascal.png" alt="Avatar" width="30" height="30" class="rounded-circle">');
      // Mostrar monto total de trabajos realizados en el navbar (solo demostrativo)
      let totalPayments = jobs.reduce((total, job) => total + parseInt(job.payment), 0);
      $('.navbar').append(`<span class="ml-2 navbar-total text-light font-weight-bold">Total: ${totalPayments} CL</span>`);
      // Mostrar cantidad de trabajos en el navbar (solo demostrativo)
      $('.navbar').append(`<span class="ml-2 navbar-jobs text-light font-weight-bold">Trabajos: ${jobs.length}</span>`);
      // Cerrar modal de inicio de sesión
      $('#loginModal').modal('hide');
    });
  
    // Evento del botón Buscar Trabajo
    $('#btnSearchJobs').click(function() {
      let searchTerm = $('#searchInput').val().trim().toLowerCase();
  
      // Filtrar trabajos por título
      let filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchTerm));
  
      // Mostrar trabajos filtrados
      $('#jobsList').empty();
      filteredJobs.forEach(function(job, index) {
        let card = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <p class="card-text"><strong>Empleador:</strong> ${job.employer}</p>
              <p class="card-text"><strong>Dirección:</strong> ${job.location}</p>
              <p class="card-text"><strong>Pago:</strong> ${job.payment}</p>
              <p class="card-text"><strong>Descripción:</strong> ${job.description}</p>
              <button class="btn btn-success btn-sm btn-accept-job" data-index="${index}" data-toggle="modal" data-target="#acceptJobModal">Aceptar Trabajo</button>
            </div>
          </div>
        `;
        $('#jobsList').append(card);
      });
  
      // Agregar evento al botón de Aceptar Trabajo (después de filtrar)
      $('.btn-accept-job').click(function() {
        let index = $(this).data('index');
        let job = filteredJobs[index];
        
        // Mostrar información del trabajo en el modal de aceptar trabajo
        $('#jobDetails').html(`
          <p><strong>Título:</strong> ${job.title}</p>
          <p><strong>Empleador:</strong> ${job.employer}</p>
          <p><strong>Dirección:</strong> ${job.location}</p>
          <p><strong>Pago:</strong> ${job.payment}</p>
          <p><strong>Descripción:</strong> ${job.description}</p>
        `);
      });
    });
  });
  
  
  
  