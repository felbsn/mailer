<script lang="ts">
    import x from "axios";
    let body = "<b>test</b> content";
    let title = "test title";
    let msg = ``;
    let to = "your@email.com";

    function send() {
        msg = "";
        x.post("", { title, body, to }, { responseType: "json" })
            .then((r) => {
                msg = r.data;
            })
            .catch((err) => {
                msg = err.data ?? err.toString();
            });
    }
</script>

<div class="container">
    <div class="card">
        <input type="email" bind:value={to} />
        <input type="text" bind:value={title} />
        <span contenteditable="true" bind:innerHTML={body} />

        <button on:click={send}>send</button>

        {#if msg}
            <div class="response">{JSON.stringify(msg)}</div>
        {/if}
    </div>

    <!-- <span>{msg}</span>
    {#if msg}
        <span>{msg}</span>
    {/if} -->
</div>

<style>
    :global(html, body) {
        margin: 0;
        width: 100%;
        height: 100%;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        font-size: 1.1em;
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: black;
        background: radial-gradient(at top, crimson, black);
    }
    .card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
        background-color: #0007;
        backdrop-filter: blur(12px);

        box-shadow: 0 1px 5px #fff4;

        border-radius: 6px;
        color: white;

        width: 320px;
    }

    input,
    span[contenteditable="true"],
    button {
        min-height: 32px;

        border-radius: 6px;
        padding: 6px;
        font-size: 18px;
        border: none;
        background: #fffc;
        color: #444;
        box-sizing: border-box;
    }
    *:focus {
        outline: 3px solid dodgerblue;
        background: #ffff;
    }

    .response {
        font-size: 14px;
        overflow: auto;
        color: dodgerblue;

        background-color: #0005;
        padding: 6px;
        border-radius: 6px;
    }

    button {
        background: dodgerblue;
        color: whitesmoke;
        cursor: pointer;
    }

    button:focus {
        background: rgb(66, 157, 249);
    }

    button:hover {
        background: rgb(66, 157, 249);
    }
    button:active {
        background: rgb(0, 128, 255);
    }

    span[contenteditable="true"] {
        box-shadow: inset 0 0 2px indianred;
    }
</style>
