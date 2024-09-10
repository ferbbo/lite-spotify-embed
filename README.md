
# Lite Spotify Embed

A lightweight and customizable Spotify embed component built with TypeScript, designed for seamless integration into modern web applications.

## Key Features

- **Lightweight:** Minimal dependencies for optimized performance.
- **Customizable:** Easily style and configure the embed to match your application's design.
- **TypeScript:** Ensures robust and maintainable code with type safety.


### Props Explanation and Usage

Here’s how you can use and configure the component's props:

1. **`bg-color` (optional)**: 
   - **Type:** `string`
   - **Description:** Sets the background color of the embed. This can be any valid CSS color value (e.g., `#281090`, `rgba(255, 255, 255, 0.5)`, etc.).
   - **Usage Example:**
     ```html
     <lite-spotify-embed bg-color="#281090"></lite-spotify-embed>
     ```

2. **`token-id` (required)**:
   - **Type:** `string`
   - **Description:** The Spotify token ID associated with the content you want to embed. This is necessary for fetching and displaying the specific content.
   - **Usage Example:**
     ```html
     <lite-spotify-embed token-id="5pD4rkzDsfYMZZwtfYuaz1"></lite-spotify-embed>
     ```

3. **`content-type` (required)**:
   - **Type:** `string`
   - **Description:** Specifies the type of content to embed. Acceptable values might include `track`, `show`, `playlist`, or `episode` (for podcasts).
   - **Usage Example:**
     ```html
     <lite-spotify-embed content-type="episode" token-id="5pD4rkzDsfYMZZwtfYuaz1"></lite-spotify-embed>
     ```
     
## Installation

Clone the repository and install dependencies using `pnpm`:

```bash
git clone https://github.com/ferbbo/lite-spotify-embed.git
cd lite-spotify-embed
pnpm install
```
## Usage
To use the component in your project, import it as a module:
```
<script type="module"
  import LiteSpotifyEmbed from 'lite-spotify-embed';
</script>

 <lite-spotify-embed
      bg-color="#281090"
      token-id="5pD4rkzDsfYMZZwtfYuaz1"
      content-type="episode"
```
## Attributes

| **Atributo**    | **Tipo**                              | **Descripción**                                                                                     | **Valores posibles**                  |
|-----------------|---------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------|
| `bg-color`      | `string`                              | Color de fondo del frame falso que se muestra antes de cargar el iframe.                             | Cualquier valor de color CSS válido   |
| `token-id`      | `string`                              | ID único del contenido de Spotify que se desea incrustar (por ejemplo, ID de una canción o playlist). | ID de un recurso de Spotify           |
| `content-type`  | `'show'` \| `'track'` \| `'play-list'` \| `'episode'` | Tipo de contenido de Spotify que se va a incrustar.                                                  | `'show'`, `'track'`, `'play-list'`, `'episode'` |


For more details and advanced usage, you can check the project on [GitHub](https://github.com/ferbbo/lite-spotify-embed).

## License
This project is licensed under the MIT License.
