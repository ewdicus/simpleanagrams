document.addEventListener("DOMContentLoaded", function() {

  // Helper Functions
  function getAjax(url, success, fail, timeout) {
    if(timeout == undefined){
      timeout = 5000;
    }
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.timeout = timeout;
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3){
          if(xhr.status >= 200 && xhr.status < 300){
            success(xhr.responseText);
          }else{
            fail(xhr.responseText);
          }
        }
    };
    xhr.ontimeout = function () {
      fail("Request Timed Out");
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
  }

  function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
  }

  function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
  }

  function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
  }

  function helpSuccess(element, message){
    var helpElement = document.getElementById(element);
    addClass(helpElement, "success");
    removeClass(helpElement, "error");
    removeClass(helpElement, "hidden");
    helpElement.textContent = message;
  }
  function helpError(element, message){
    var helpElement = document.getElementById(element);
    addClass(helpElement, "error");
    removeClass(helpElement, "success");
    removeClass(helpElement, "hidden");
    helpElement.textContent = message;
  }
  function hideHelp(element){
    var helpElement = document.getElementById(element);
    addClass(helpElement, "hidden");
  }

  function submitWorking(element){
    var el = document.getElementById(element);
    el.innerHTML = '<i class="glyphicon glyphicon-cog gly-spin"></i>';
    el.disabled = true;
  }
  function submitNormal(element){
    var el = document.getElementById(element);
    el.textContent = 'Submit';
    el.disabled = false;
  }

  // Form handler functions
  function generateAnagram(){
    submitWorking('generate_submit');
    hideHelp('generate_query_help');

    var query_input = document.getElementById('generate_query_input');
    getAjax('/generate/?q=' + query_input.value, function(data){
      if(data){
        helpSuccess('generate_query_help', data);
      }else{
        helpError('generate_query_help', "No Anagrams Found");
      }
      submitNormal('generate_submit');
    }, function(data){
      helpError('generate_query_help', data);
      submitNormal('generate_submit');
    });

    return false; // Don't submit normally
  }

  function validateAnagram(){
    submitWorking('validate_submit');
    hideHelp('validate_anagram_help');

    var query_input = document.getElementById('validate_query_input');
    var anagram_input = document.getElementById('validate_anagram_input');
    getAjax('/validate/?q=' + query_input.value + '&anagram=' + anagram_input.value, function(data){
      var result = JSON.parse(data);
      if(result.valid){
        helpSuccess('validate_anagram_help', "Valid Anagram");
      }else{
        helpError('validate_anagram_help', result.reason);
      }
      submitNormal('validate_submit');
    }, function(data){
      helpError('validate_anagram_help', data);
      submitNormal('validate_submit');
    });


    return false; // Don't submit normally
  }

  // Expose form handler functions
  window.anagramServer = {
    "generateAnagram" : generateAnagram,
    "validateAnagram" : validateAnagram
  };
});
