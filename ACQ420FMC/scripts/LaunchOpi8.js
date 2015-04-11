importPackage(Packages.org.csstudio.opibuilder.scriptUtil);

function pad(ii, nchars)
{
	if (nchars == 2 && ii < 10){
		return "0"+ii;
	}else{
		return ""+ii;
	}
}


var flagName = "firstRun";
//Avoid running this script if the script is triggered during opi startup.
if(widgetController.getExternalObject(flagName) == null){
	widgetController.setExternalObject(flagName, false);	
}else{
	var macroInput = DataUtil.createMacrosInput(true);
	macroInput.put("UUT", PVUtil.getString(pvArray[0]));
	macroInput.put("SITE", PVUtil.getLong(pvArray[1]));	
       
	var ch = PVUtil.getLong(pvArray[2]);
	for (var nc = 1; nc <= 8; ++nc, ++ch){
		macroInput.put("CH"+pad(nc, 2), pad(ch, 2));		 		
	}
	       
	var opi = widget.getPropertyValue("name") + ".opi";	       
	ScriptUtil.openOPI(widgetController,  opi, 0, macroInput);
}