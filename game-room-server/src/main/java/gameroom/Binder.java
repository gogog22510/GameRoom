package gameroom;

import akka.actor.ActorSystem;
import akka.stream.ActorMaterializer;
import akka.stream.Materializer;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import gameroom.core.InjectActorResolver;
import gameroom.core.JavaServer;
import gameroom.mission.MissionManager;
import gameroom.core.Settings;
import gameroom.route.ServerRoutes;

public class Binder extends AbstractBinder {
    private final ActorSystem system;
    private final ActorMaterializer materializer;

    Binder() {
        this.system = ActorSystem.create("JavaServer");
        this.materializer = ActorMaterializer.create(system);
    }

    // CONSTRUCTOR FOR TEST ONLY
    Binder(ActorSystem system, ActorMaterializer materializer) {
        this.system = system;
        this.materializer = materializer;
    }

    @Override
    protected void configure() {
        bindActorSystem();
        addActiveDescriptor(Settings.class);
        addActiveDescriptor(JavaServer.class);
        addActiveDescriptor(ServerRoutes.class);
        addActiveDescriptor(MissionManager.class);
    }

    private void bindActorSystem() {
        bind(system).to(ActorSystem.class);
        bind(materializer).to(Materializer.class);
        addActiveDescriptor(InjectActorResolver.class);
    }
}
