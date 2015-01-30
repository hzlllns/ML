function wstxSubmitForm(submitBtn)
{
	if (!submitBtn || !submitBtn.form)
		return;

	submitBtn.disabled = true;

	var msg = "Please enter a value for each of the following required fields:  \n";
	var captchaMsg = "Security code must be exactly 5 digits.";
	
	var captchaInputField = null;
	var firstMissingFld = null;	

	for (var i = 0; i < submitBtn.form.length; i++)
	{
		var elm = submitBtn.form.elements[i];
		
		var required = elm.getAttribute("required");
		if (!required || (required.toLowerCase() != "true"))
			continue;
		
		if(submitBtn.form.action.toLowerCase().indexOf("formmailer.aspx") != -1 && elm.id.toLowerCase().indexOf("_captchainput") != -1)
			continue;	

		if(elm.id.toLowerCase().indexOf("_captchainput") != -1)
			captchaInputField = elm;
		
		var hasValue = true;
		switch (elm.type.toLowerCase())
		{
			case "text":
			case "textarea":
				if (_trim(elm.value).length == 0)
					hasValue = false;
				break;
			case "select-one":
			case "select-multiple":
				if (elm.selectedIndex < 0)
					hasValue = false;
				break;
		}

		if (!hasValue)
		{
			if(elm.id.toLowerCase().indexOf("_captchainput") != -1)
				msg += ('\n    ' + 'Security code');
			else
				msg += ('\n    ' + elm.name);
				
			if (!firstMissingFld)
				firstMissingFld = elm;
		}
	}
	
	
	if (!firstMissingFld)
	{
	
		if(captchaInputField && (_trim(captchaInputField.value).length != 5 || !isNumeric(_trim(captchaInputField.value))))
		{
			alert(captchaMsg);
			firstMissingFld = captchaInputField;			
			_select(captchaInputField);
			submitBtn.disabled = false;	
		}
		else
			submitBtn.form.submit();
	}
	else
	{
		alert(msg);
		_select(firstMissingFld);
		submitBtn.disabled = false;
	}

	return !firstMissingFld;

	function _trim(str) { return str.replace(/^\s*|\s*$/g, ''); }

	function _select(elm)
	{
		elm.focus();
		if (elm.type=="text" || elm.type=="textarea")
			elm.select();
	}
	
	function isNumeric(input)
	{	
		var regexp = /^[0-9]+$/;
		if(regexp.test(input))
		{
			return true;
		}
	
		return false;
	}
}