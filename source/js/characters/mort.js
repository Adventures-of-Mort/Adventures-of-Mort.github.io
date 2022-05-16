const mort = {
	texture: "texture",
	frame: 0,
	type: "Mort",
	currentHP: 130,
	maxHP: 130,
	exp: 0,
	level: 1,
}

export default mort

/* ----- POSSIBLE EXP HANDLING -----

Enemies give 10 exp per kill,

future proof by having experience check be its own method

Possibly check player lvl against enemy level and adjust
income accordingly

EndBattle method on battlescene will check all player
characters exp after its been applied

----- POSSIBLE HP HANDLING -----

When building hero array in battlescene, also build an array
of the objects with identical indexs

create new method on Enemy Unit class that targets spefically
the PC object

Once a target has been generated for enemies to attack, also

*/
