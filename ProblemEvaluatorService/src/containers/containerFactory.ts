import Docker from 'dockerode';

async function createContainer(imageName: string, cmdExecutable: string[]): Promise<Docker.Container> {
    const docker = new Docker(); // Adjust based on your Docker setup on Windows

   
    try {
        const container = await docker.createContainer({
            Image: imageName,
            Cmd: cmdExecutable,
            AttachStdin: true, 
            AttachStdout: true, // to enable output streams
            AttachStderr: true,
            HostConfig:{
                Memory:1024*1024*512   //512MB
            }, // to enable error streams
            Tty: false,
            OpenStdin: true // keep the input stream open even if no interaction is there
        });

        return container;
    } catch (err) {
        console.error(`Error creating container: ${err}`);
        throw err;
    }
}

export default createContainer;
