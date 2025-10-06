import { compare_robots } from "./05-compare.robots.js"
import {
	goal_oriented_robot,
	lazy_robot, random_robot,
	route_robot
} from "./07-example_robots.js"


compare_robots(lazy_robot, [], random_robot, [])
