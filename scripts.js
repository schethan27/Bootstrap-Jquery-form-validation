$(document).ready(function(){
	/*
		Add id attribute to each form-group .Id should be in the patten xxxxx-fg.
		xxxx should match the input element id
		add for attribute to all input label element

		For mandatory fields add required attribute as shown in example
		For example: 
			<div id="input4-fg" class="form-group row">
			      <label for="input4" class="col-sm-2 col-form-label">From</label>
			      <div class="col-sm-10">
			        <input type="email" class="form-control" id="input4" placeholder="From" required>
			      </div>
		    </div>	
	*/
	//replace all the input id's here to validate on focus out event event
	$('#input1,#input2,#input3,#input4').focusout(function(event){
			validateFieldElement(event.target);
	});

	$('#btnSave').click(function(){
		// Replace with the form id that to be validated
		if( isValidForm('myForm') ){
			alert("Form is valid")
		}else{

		}
	});

	function isValidForm(formId){
		var errors = [];
		$('#'+formId +' *').filter(':input').each(function(){
			var element = this;
			var hasError = validateFieldElement(element)
			if(hasError){
				errors.push(hasError);
			}
		});

		if(errors.length > 0){
			return false;
		}else{
			return true;
		}
	}

	function validateFieldElement(element){
		var hasFieldError = false;
		var isMandatoryField = element.hasAttribute('required');
		var value = $(element).val().trim();


		if($(element).is('input')){
			var type = element.type;
			
			if( ( value == null || value == "" ) && isMandatoryField ){
				hasFieldError = true;
				setError(element,"Field is mandatory"); //Hard coded to be mande constants
				return hasFieldError;
			}else{
				hasFieldError = false;
				removeError(element);
			}

			switch(type){
				
				case "email":
					var emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if(!emailRegx.test(value)){
						hasFieldError = true;
						setError(element,"Invalid email pattern");//Hard coded to be mande constants
					}else{
						hasFieldError = false;
						removeError(element);
					}
					break;
				case "password":
					//Do validation for number
					break;
				case "number":
					//Do validation for number
					break;
			}
		}else if($(element).is('select')){
			// Code duplication 
			if( ( value == null || value == "" ) && isMandatoryField ){
				hasFieldError = true;
				setError(element,"Field is mandatory") //Hard coded to be mande constants
				return hasFieldError;
			}else{
				hasFieldError = false;
				removeError(element);
			}

		}

		return hasFieldError;
	}	

	// Adds the bootstrap error css property to each form element
	function setError(element,message){

		$('#'+element.id+'-fg').addClass("has-danger");
		$(element).addClass("form-control-danger");
		
		if(message != null && message !== ""){
			$('#'+element.id+'-fg .form-control-feedback').empty();
			$(element).parent().append('<div class="form-control-feedback">'+message+'</div>')
		}
	}

	function removeError(element){
		$('#'+element.id+'-fg').removeClass("has-danger");
		$(element).removeClass("form-control-danger");
		$('#'+element.id+'-fg .form-control-feedback').empty();
	}
});