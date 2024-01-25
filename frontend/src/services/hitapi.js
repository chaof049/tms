import axios from "axios";
import { baseUrl } from "../config/config";

export let hitApi = axios.create({
  baseURL: baseUrl,
});
