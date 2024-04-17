import axios from "axios";
import { API_VERSION } from "../constants";

export const Api = axios.create({
	headers: {
		Authorization: "MTIyNDE4MjgxMzU3MDQ5ODU4MA.G5VeD9.5zZRQ6rIfqHYBALj1rNDH3gv7DJDk7UliGOfhg"
	},
	baseURL: `https://discord.com/api/${API_VERSION}`
});


