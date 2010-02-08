var spring = 500.0;
var damper = 5.0;
var drag = 10.0;
var angularDrag = 5.0;
var distance = 0.05;
var attachToCenterOfMass = false;

private var springJoint : SpringJoint;

function Update ()
{
	// Make sure the user pressed the mouse down

	var mainCamera = FindCamera();
		
	// We need to actually hit an object
	var hit : RaycastHit;
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(Vector3(mainCamera.pixelWidth/2, mainCamera.pixelHeight/2,0)),  hit, 5))
		return;
	// We need to hit a rigidbody that is not kinematic
	if (!hit.rigidbody || hit.rigidbody.isKinematic)
		return;
	
	hit.rigidbody.renderer.material.color.r = 1.0;
	hit.rigidbody.renderer.material.color.g = 0;
	hit.rigidbody.renderer.material.color.b = 0;
		
	if (!Input.GetMouseButtonDown (0))
	return;
	
	if (!springJoint)
	{
		var go = new GameObject("Rigidbody dragger");
		body = go.AddComponent ("Rigidbody");
		springJoint = go.AddComponent ("SpringJoint");
		body.isKinematic = true;
	}
	
	springJoint.transform.position = hit.point;
	if (attachToCenterOfMass)
	{
		var anchor = transform.TransformDirection(hit.rigidbody.centerOfMass) + hit.rigidbody.transform.position;
		anchor = springJoint.transform.InverseTransformPoint(anchor);
		springJoint.anchor = anchor;
	}
	else
	{
		springJoint.anchor = Vector3.zero;
	}
	
	springJoint.spring = spring;
	springJoint.damper = damper;
	springJoint.maxDistance = distance;
	springJoint.connectedBody = hit.rigidbody;
	
	StartCoroutine ("DragObject", hit.distance);
}

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

function FindCamera ()
{
	if (camera)
		return camera;
	else
		return Camera.main;
}