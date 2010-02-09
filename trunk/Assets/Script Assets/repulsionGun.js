var spring = 500.0;
var damper = 5.0;
var drag = 20.0;
var angularDrag = 5.0;
var springMaxDistance = 0.05;
var detectionDistance = 50;
var repulsionDistance = 5;

private var holding = false;
private var springJoint : SpringJoint;

function Update ()
{
	// Make sure the user pressed the mouse down

	var mainCamera = FindCamera();
		
	// We need to actually hit an object
	var hit : RaycastHit;
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0)),  hit, detectionDistance))
		return;
	// We need to hit a rigidbody that is not kinematic
	if (!hit.rigidbody || hit.rigidbody.isKinematic)
		return;	
	var leftButton = Input.GetMouseButtonDown(0);
	if (!leftButton)
		return;
	
	if (!springJoint)
	{
		var go = new GameObject("Rigidbody dragger");
		body = go.AddComponent ("Rigidbody");
		springJoint = go.AddComponent ("SpringJoint");
		body.isKinematic = true;
	}
	
	springJoint.transform.position = hit.point;
	springJoint.anchor = Vector3.zero;
	
	springJoint.spring = spring;
	springJoint.damper = damper;
	springJoint.maxDistance = springMaxDistance;
	springJoint.connectedBody = hit.rigidbody;
	
	//if(leftButton) {
		//StartCoroutine ("DragObject", attractionDistance);
		//holding = true;
	//} else {
	//	DragObject(repulsionDistance);
	//}
}

/*
function DragObject (distance : float)
{
	var oldDrag = springJoint.connectedBody.drag;
	var oldAngularDrag = springJoint.connectedBody.angularDrag;
	springJoint.connectedBody.drag = drag;
	springJoint.connectedBody.angularDrag = angularDrag;
	var mainCamera = FindCamera();
	while (Input.GetMouseButton (0))
	{
		var ray = mainCamera.ScreenPointToRay (Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0));
		springJoint.transform.position = ray.GetPoint(distance);
		yield;
	}
	if (springJoint.connectedBody)
	{
		springJoint.connectedBody.drag = oldDrag;
		springJoint.connectedBody.angularDrag = oldAngularDrag;
		springJoint.connectedBody = null;
	}
}
*/

function FindCamera ()
{
	if (camera)
		return camera;
	else
		return Camera.main;
}