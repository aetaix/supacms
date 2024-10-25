<main class="h-screen flex items-center justify-center">
	<div class="bg-white border rounded-lg shadow w-full max-w-xl p-5 space-y-4">
		<h1 class="text-xl font-medium">Login</h1>
		<p>Hey! Enter your details to get sign in to your account.</p>
		<form method="POST" action="?/login" class="flex flex-col space-y-4">
			<input class="border rounded-lg py-2 px-3" name="email" type="email" placeholder="Email" />
			<input class="border rounded-lg py-2 px-3" name="password" type="password" placeholder="Password" />
			<button class="bg-green-400 text-green-950 py-2 px-3 rounded-lg">Login</button>
		</form>
	</div>
</main>
