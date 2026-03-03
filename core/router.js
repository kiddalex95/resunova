<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ResuNova – Global Resume Builder</title>
<link rel="stylesheet" href="css/tailwind.css">
<link rel="stylesheet" href="css/global.css">
</head>
<body class="bg-gray-50 font-sans">
  <header class="bg-blue-700 text-white p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold">ResuNova</h1>
    <div>
      <button id="togglePlanBtn" class="bg-white text-blue-700 px-4 py-1 rounded">Switch Plan</button>
    </div>
  </header>

  <main class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Template / Resume Preview -->
    <section id="resumePreview" class="bg-white p-4 shadow rounded overflow-auto"></section>

    <!-- User Input Form -->
    <section id="resumeForm" class="bg-white p-4 shadow rounded">
      <h2 class="text-xl font-semibold mb-4">Resume Details</h2>
      <form id="formFields" class="space-y-4">
        <input type="text" name="fullName" placeholder="Full Name" class="w-full border px-3 py-2 rounded">
        <input type="text" name="email" placeholder="Email" class="w-full border px-3 py-2 rounded">
        <input type="text" name="phone" placeholder="Phone" class="w-full border px-3 py-2 rounded">
        <select name="region" id="regionSelect" class="w-full border px-3 py-2 rounded"></select>
        <select name="audience" id="audienceSelect" class="w-full border px-3 py-2 rounded"></select>
        <textarea name="summary" placeholder="Professional Summary" class="w-full border px-3 py-2 rounded"></textarea>
        <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded w-full">Render Resume</button>
      </form>
      <button id="exportPDFBtn" class="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full">Export PDF</button>
    </section>
  </main>

<script type="module" src="js/main.js"></script>
</body>
</html>