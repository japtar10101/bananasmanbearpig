var levelNames : String[] = ["testing", "gap"];
var title : String = "Select a level";
var buttonHeight : int = 30;
var buttonGap : int = 10;
var buttonWidth : int = 80;

private var numLevels : int = levelNames.length;
private var groupWidth : int = buttonWidth + 20;
private var groupHeight : int = buttonHeight * (numLevels + 1) + buttonGap * (numLevels + 1);

function OnGUI () {
	var shiftLeft : int = Screen.width / 2 - groupWidth / 2;
	var shiftUp : int = Screen.height / 2 - groupHeight / 2;

	// Make a group on the center of the screen
	GUI.BeginGroup (Rect (shiftLeft, shiftUp, groupWidth, groupHeight));
	// All rectangles are now adjusted to the group. (0,0) is the topleft corner of the group.

	// We'll make a box so you can see where the group is on-screen.
	GUI.Box (Rect (0,0,groupWidth,groupHeight), title);
	
	// Position all the buttons
	var y = buttonHeight; var x = 10;
	for( var i = 0; i < numLevels; ++i ) {
		var levelName = levelNames[i];
		if(GUI.Button (Rect (x, y,buttonWidth,buttonHeight), levelName)) {
			Application.LoadLevel(levelName);
		}
		y += buttonHeight + buttonGap;
	}

	// End the group we started above. This is very important to remember!
	GUI.EndGroup ();
}
