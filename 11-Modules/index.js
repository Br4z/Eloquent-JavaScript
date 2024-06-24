import compare_robots from "./compare.robots.js"
import { run_robot, random_robot, route_robot, goal_oriented_robot, smart_robot } from "./robots.js"


compare_robots(route_robot, [], goal_oriented_robot, [])
