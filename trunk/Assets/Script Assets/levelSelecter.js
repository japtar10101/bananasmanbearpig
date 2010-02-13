var levelNames : String[] = ["level1", "bowling", "testing"];
var title : String = "Select a level";
var buttonGap : int = 20;

private var numLevels : int = levelNames.length;

function OnGUI () {
	var buttonWidth : int = Screen.width / 2;
	var buttonHeight : int = Screen.height / (numLevels) - buttonGap * (numLevels);
	var groupWidth : int = buttonWidth + 20;
	var groupHeight : int = buttonHeight * (numLevels) + buttonGap * (numLevels + 1);
	var shiftLeft : int = buttonWidth - groupWidth / 2;
	var shiftUp : int = Screen.height / 2 - groupHeight / 2;

	// Make a group on the center of the screen
	GUI.BeginGroup (Rect (shiftLeft, shiftUp, groupWidth, groupHeight));
	// All rectangles are now adjusted to the group. (0,0) is the topleft corner of the group.

	// We'll make a box so you can see where the group is on-screen.
	GUI.Box (Rect (0,0,groupWidth,groupHeight), title);
	
	// Position all the buttons
	var y = buttonGap; var x = 10;
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
