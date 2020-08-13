import { BackgroundOptionsEditor } from "./Background/BackgroundOptionsEditor";
import { ParticlesOptionsEditor } from "./Particles/ParticlesOptionsEditor";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import { InteractivityOptionsEditor } from "./Interactivity/InteractivityOptionsEditor";
import { BackgroundMaskOptionsEditor } from "./BackgroundMask/BackgroundMaskOptionsEditor";
import { InfectionOptionsEditor } from "./Infection/InfectionOptionsEditor";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../EditorBase";
import { BackgroundModeOptionsEditor } from "./BackgroundMode/BackgroundModeOptionsEditor";

export class OptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IOptions;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("options", "Options", false);
        this.options = this.group.data as IOptions;

        this.addBackground();
        this.addBackgroundMask();
        this.addBackgroundMode();
        this.addInfection();
        this.addInteractivity();
        this.addParticles();

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("autoPlay", "Auto Play", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("detectRetina", "Detect Retina", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("fpsLimit", "FPS Limit", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("pauseOnBlur", "Pause on Blur", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addBackground(): void {
        const options = new BackgroundOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addBackgroundMask(): void {
        const options = new BackgroundMaskOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addBackgroundMode(): void {
        const options = new BackgroundModeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addInfection(): void {
        const options = new InfectionOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addInteractivity(): void {
        const options = new InteractivityOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addParticles(): void {
        const options = new ParticlesOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }
}