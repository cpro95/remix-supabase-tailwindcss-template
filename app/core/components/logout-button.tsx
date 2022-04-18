import { Form } from "@remix-run/react";

export function LogoutButton() {
  return (
    <Form action="/logout" method="post">
      <button
        type="submit"
        className="rounded bg-slate-600 px-4 py-3 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
      >
        Logout
      </button>
    </Form>
  );
}
