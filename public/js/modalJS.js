/*global $*/

$(document).ready(function() {
    

    //REGISTER SCRIPT
    $('#registerButton').click(function(e) {
        $('#register_modal').modal('show');
        e.preventDefault();
    });

    //NEW MENU SCRIPT
    $(".newMenu").click(function(e) {
        $('#new_menu_modal').modal('show');
        e.preventDefault();
    });
    


    //NEW LINK SCRIPT
    $(".newLinkDiv").click(function(e) {

        $('#new_link_modal').modal('show');
        
        var action = "/dashboard/" + $(this).attr('id') + "/new_link";

        var $menuName = $(this).closest('.content').prev('.title');

        var menuName= $menuName.text().trim();
        
        document.getElementById('linkParentMenu').textContent = "Add link to " + menuName;
        
        $("#new_link_form").attr("action", action);

        e.preventDefault();
    });

    

    //DELETE MENU SCRIPT
    $(".deleteMenuDiv").click(function(e) {

        $('#delete_modal').modal('show');

        var action = "/dashboard/" + $(this).attr('id') + "/deleteMenu?_method=DELETE";

        var menuName =  $(this).attr('value').trim();

        $("#deleteForm").attr("action", action);

        document.getElementById('itemToDelete').innerHTML = "<i class='trash outline icon'></i> Delete the <span class='toDelete'>" + menuName + "</span> menu and all of its links?";

        e.preventDefault();
    });
    

 
    //DELETE LINK SCRIPT
    $(".linkTrash").click(function(e) {

        $('#delete_modal').modal('show');

        var action = "/dashboard/" + $(this).attr('id') + "/deleteLink?_method=DELETE";

        var linkName = $(this).attr('value').trim();

        $("#deleteForm").attr("action", action);

        document.getElementById('itemToDelete').innerHTML = "<i class='trash outline icon'></i> Delete the <span class='toDelete'>" + linkName + "</span> link?";

        e.preventDefault();
    });
    
    

    //EDIT MENU SCRIPT
    $(".editMenuDiv").click(function(e) {

        $('#edit_menu_modal').modal('show');
        
        var action = "/dashboard/" + $(this).attr('id') + "/edit_menu?_method=PUT";

        var $menuName = $(this).closest('.content').prev('.title');

        var menuName = $menuName.text().trim();

        $("#editMenuInput").attr("value", menuName);

        $("#edit_menu_form").attr("action", action);
        
        $(".deleteMenuDiv").attr("id", $(this).attr('id'));
        
        $(".deleteMenuDiv").attr("value", $("#editMenuInput").attr('value'));

        e.preventDefault();
    });



    //EDIT LINK SCRIPT
    $(".linkEdit").click(function(e) {

        $('#edit_link_modal').modal('show');
        
        var action = "/dashboard/" + $(this).attr('id') + "?_method=PUT";

        var $linkName = $(this).parent().closest('div');

        var $url = $(this).closest('.item').children('.link');

        var linkName = $linkName.text().trim();

        var url = $url.attr('href');
        
        document.getElementById('editLinkName').value = linkName;
        
        document.getElementById('editLinkURL').value = url;
        
        $("#edit_link_form").attr("action", action);

        $(".linkTrash").attr("id", $(this).attr('id'));
        
        $(".linkTrash").attr("value", linkName);

        e.preventDefault();
    });
    
    
    
});