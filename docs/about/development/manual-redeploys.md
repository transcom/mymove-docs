# Manual Redeploys and Other Helpful Information in an Emergency

Like many modern software developers, we rely on a number of external services to be responsible for certain repeatable processes. One such example is CircleCI, which we use for deployment. It's a great tool in many ways, and reduces the surface area of what we ourselves have to manage, ideally transferring associated risk. However, it opens us up to a different risk: namely, what happens if CircleCI goes down and we need to deploy our app? For this circumstance, we have a series of scripts that can be run manually. They live in the script directory, and you can find information about how to run them [in this README under the Deployment Scripts heading](https://github.com/transcom/mymove/tree/main/scripts#deployment-scripts).

Please add any other fear-inducing scenarios and our mitigation attempts here.
