import compare_robots from "./measuring_a_robot.js"
import { goal_oriented_robot } from "./pathfinding.js"
import lazy_robot from "./robot_efficiency.js"
import { random_robot } from "./simulation.js"
import route_robot from "./the_mail_trucks_route.js"


compare_robots(goal_oriented_robot, [], lazy_robot, [])
