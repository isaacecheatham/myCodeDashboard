$(document).ready(function() {
    
    //LOGIN SCRIPT
    $('.signInButton').click(function() {
        $('#login_modal').modal('show');
    });

    //NEW MENU SCRIPT
    $(".newMenu").click(function(e) {

        $('#new_menu_modal').modal('show');
        e.preventDefault();
    });

    //NEW LINK SCRIPT
    $(".newLinkDiv").click(function(e) {

        $('#new_link_modal').modal('show');

        var $div2 = $(this).closest('.content').prev('.title')

        var text2 = $div2.text().trim();

        document.getElementById('linkParentDropDown').value = text2;

        e.preventDefault();
    });

    //DELETE MENU SCRIPT
    $(".deleteMenuDiv").click(function(e) {

        $('#delete_modal').modal('show');

        var id = "/dashboard/" + $(this).attr('id') + "/deleteMenu?_method=DELETE";

        var text =  $(this).attr('value').trim();

        $("#deleteForm").attr("action", id);

        document.getElementById('itemToDelete').innerHTML = "<i class='trash outline icon'></i> Delete the <span class='toDelete'>" + text + "</span> menu and all of its links?";

        e.preventDefault();
    });
 
    //DELETE LINK SCRIPT
    $(".linkTrash").click(function(e) {

        $('#delete_modal').modal('show');

        var id = "/dashboard/" + $(this).attr('id') + "/deleteLink?_method=DELETE";

        var text = $(this).attr('value').trim();

        $("#deleteForm").attr("action", id);

        document.getElementById('itemToDelete').innerHTML = "<i class='trash outline icon'></i> Delete the <span class='toDelete'>" + text + "</span> link?";

        e.preventDefault();
    });

    //EDIT MENU SCRIPT
    $(".editMenuDiv").click(function(e) {

        $('#edit_menu_modal').modal('show');

        $div = $(this).closest('.content').prev('.title')

        var id = "/dashboard/" + $(this).attr('id') + "/edit_menu?_method=PUT";

        text = $div.text().trim();

        $("#editMenuInput").attr("value", text);

        $("#edit_menu_form").attr("action", id);
        
        $(".deleteMenuDiv").attr("id", $(this).attr('id'));
        
        $(".deleteMenuDiv").attr("value", $("#editMenuInput").attr('value'));

            e.preventDefault();
    });

    //EDIT LINK SCRIPT
    $(".linkEdit").click(function(e) {

        $('#edit_link_modal').modal('show');

        var $div = $(this).parent().closest('div');

        var $div2 = $(this).closest('.content').prev('.title')

        var $div3 = $(this).closest('.item').children('.link');

        var id = "/dashboard/" + $(this).attr('id') + "?_method=PUT";

        var text = $div.text().trim();

        var text2 = $div2.text().trim();

        var text3 = $div3.attr('href');

        $("#edit_link_form").attr("action", id);

        document.getElementById('editLinkMenusDropDown').value = text2;
        document.getElementById('editLinkName').value = text;
        document.getElementById('editLinkURL').value = text3;
        
        

        // document.getElementById('itemToDelete').innerHTML = "<i class='trash outline icon'></i> Delete the " + text + " link?";
        
        $(".linkTrash").attr("id", $(this).attr('id'));
        
        $(".linkTrash").attr("value", text);

        e.preventDefault();
    });
});


// $("#input").keydown(function(e) {
//     var oldvalue=$(this).val();
//     var field=this;
//     setTimeout(function () {
//         if(field.value.indexOf('http://') !== 0) {
//             $(field).val(oldvalue);
//         } 
//     }, 1);
// });