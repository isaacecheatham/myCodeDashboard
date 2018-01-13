window.less = {
    async: true,
    environment: 'production',
    fileAsync: false,
    onReady: false,
    useFileCache: true
};
        
        
$('.activating.element')
  .popup({
      position: "bottom right"
  })
;

$('.ui.accordion')
            .accordion();
            
            
setTimeout(function(){$('.success_alerts').fadeOut();}, 5000);
        
$(window).click(function(){$('.error_alerts').fadeOut();});