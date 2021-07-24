window.onload = async () => {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = "Loading...";
  const assets = await (await fetch("assets.json")).json();
  gallery.innerHTML = "";
  console.log(assets);
  assets.models.forEach(model => {
    const div = document.createElement("div");
    div.classList.add("model");
    const link = document.createElement("a");
    link.href = model.model;
    const title = document.createElement("h1");
    title.innerHTML = model.title;
    link.appendChild(title);
    div.appendChild(link);
    const img = document.createElement("img");
    img.src = model.preview;
    img.classList.add("preview");
    div.appendChild(img);
    const description = document.createElement("div");
    description.innerHTML = model.description;
    div.appendChild(description);

    img.onclick = () => {
      const frame = document.createElement("iframe");
      frame.src = model.model;
      frame.classList.add("liveview");
      div.insertBefore(frame, description);
      div.removeChild(img);
    };

    gallery.appendChild(div);
  });
};
