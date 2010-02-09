var detectionDistance = 30;
var endDistance = 10;
var speed = 6.0;

private var moveDirection = Vector3.zero;

function FixedUpdate() {
	// We need to actually hit an object
	var mainCamera = FindCamera();
	var hit : RaycastHit;
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0)),  hit, detectionDistance))
		return;
	
	// We need to hit a rigidbody that is kinematic
	// TODO: this is probably broken
	if (!hit.rigidbody || !hit.rigidbody.isKinematic)
		return;
	
	// Turn the object green
	hit.rigidbody.renderer.material.color.r = 0.0; 
	hit.rigidbody.renderer.material.color.g = 1.0; 
	hit.rigidbody.renderer.material.color.b = 0.0;
	
	// Make sure the user pressed the mouse down
	/*
	if (Input.GetMouseButtonDown(0))
		StartCoroutine ("Grappling");
}

function Grappling ()
{
	var mainCamera = FindCamera();
	var ray : Ray;
	var controller : CharacterController;
	
	//Loop while holding the left button
	while (Input.GetMouseButton (0))
	{
		ray = mainCamera.ScreenPointToRay (Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0));
		controller = GetComponent(CharacterController);
		moveDirection = ray.GetPoint(endDistance) - controller.center;
		
		// We are grounded, so recalculate movedirection directly from axes
		moveDirection = ray.GetPoint(endDistance);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		// Move the controller
		controller.Move(moveDirection * Time.deltaTime);
	}
*/
}

function FindCamera ()
{
	if (camera)
		return camera;
	else
		return Camera.main;
}

@script RequireComponent(CharacterController)