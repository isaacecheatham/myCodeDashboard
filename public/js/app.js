// function submitFileForm() {
  

//   const menuData = {
//     title: $('#menuName').val(),
//   };

//   let method, url;

//     method = 'POST';
//     url = '/dashboard/new_menu';


//   $.ajax({
//     type: method,
//     url: url,
//     data: JSON.stringify(menuData),
//     dataType: 'json',
//     contentType : 'application/json',
//   })
//     .done(function(response) {
//       console.log("We have posted the data");
//     })
//     .fail(function(error) {
//       console.log("Failures at posting, we are", error);
//     })

//   console.log("Your file data", menuData);
// }



// function refreshFileList() {
//   const template = $('#list-template').html();
//   const compiledTemplate = Handlebars.compile(template);

//   getFiles()
//     .then(files => {

//       window.fileList = files;

//       const data = {files: files};
//       const html = compiledTemplate(data);
//       $('#list-container').html(html);
//     })
// }
