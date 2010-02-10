var speed = 6.0;
var jumpSpeed = 8.0;
var gravity = 20.0;

private var moveDirection = Vector3.zero;
private var grounded : boolean = false;
var grapplevector = Vector3.zero;

function FixedUpdate() {
	// We are grounded, so recalculate movedirection directly from axes
	var oldy = moveDirection.y;
	moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= speed;
	moveDirection.y = oldy;
	
	if (Input.GetButton ("Jump") && grounded) {
		moveDirection.y = jumpSpeed;
	}

	// Apply gravity
	moveDirection.y -= gravity * Time.deltaTime;
	
	if(grapplevector != Vector3.zero){
		moveDirection = grapplevector;
	}
	
	// Move the controller
	var controller : CharacterController = GetComponent(CharacterController);
	var flags = controller.Move(moveDirection * Time.deltaTime);
	grounded = (flags & CollisionFlags.CollidedBelow) != 0;
}

@script RequireComponent(CharacterController)