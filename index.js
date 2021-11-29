window.onload = async () => {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = "Loading...";
  const assets = await (await fetch("assets.json")).json();
  gallery.innerHTML = "";
  console.log(assets);
  assets.models.forEach(model => {
    const div = document.createElement("div");
    div.classList.add("model");

    // Title (with link)
    const link = document.createElement("a");
    link.href = model.model;
    const title = document.createElement("h1");
    title.innerHTML = model.title;
    link.appendChild(title);
    div.appendChild(link);

    // Date
    const date = document.createElement("p");
    if (typeof(model.date) == "number") {
      date.innerHTML = new Date(model.date * 1000).toDateString();
    } else {
      date.innerHTML = model.date;
    }
    date.classList.add("date");
    div.appendChild(date);

    // Preview Image
    const preview = document.createElement("div");
    preview.classList.add("preview");
    const img = document.createElement("img");
    img.src = model.preview;
    img.classList.add("preview");
    preview.appendChild(img);

    // 3D Icon
    const icon = document.createElement("span");
    icon.classList.add("material-icons");
    icon.classList.add("icon");
    icon.innerHTML = "3d_rotation";
    preview.appendChild(icon);
    div.appendChild(preview);

    // Description
    const description = document.createElement("div");
    description.innerHTML = model.description;
    div.appendChild(description);

    // Live View
    preview.onclick = () => {
      const frame = document.createElement("iframe");
      frame.src = model.model;
      frame.classList.add("liveview");
      div.insertBefore(frame, description);
      div.removeChild(preview);
    };

    gallery.appendChild(div);
  });
};
