export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateRegisterBody(body: any): string | null {
  const { email, password, name } = body;
  if (!email || !password || !name) {
    return "Email, password, and name are required";
  }
  if (!validateEmail(email)) {
    return "Invalid email format";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
}

export function validateLoginBody(body: any): string | null {
  const { username, password } = body;
  if (!username || !password) {
    return "Username and password are required";
  }
  return null;
}

export function validateSensorBody(body: any): string | null {
  const { mode, temperature, pressure, flow_rate } = body;
  if (
    mode === undefined ||
    temperature === undefined ||
    pressure === undefined ||
    flow_rate === undefined
  ) {
    return "All fields are required: mode, temperature, pressure, flow_rate";
  }
  if (mode !== "offshore" && mode !== "onshore") {
    return "Mode must be 'offshore' or 'onshore'";
  }
  if (
    typeof temperature !== "number" ||
    typeof pressure !== "number" ||
    typeof flow_rate !== "number"
  ) {
    return "Temperature, pressure, and flow_rate must be numbers";
  }
  return null;
}
